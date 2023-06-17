import { Order, Product, Role } from '@prisma/client';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import isMongoId from 'validator/lib/isMongoId';

cloudinary.config(config.CLOUDINARY_URL);

import {
  countAllOrders,
  countAllProducts,
  countAllUsers,
  countLowStockProducts,
  countOutOfStockProducts,
  countPaidOrders,
  createOneProduct,
  findAllOrders,
  findAllUsers,
  findManyProductsSortByTitle,
  findProductImages,
  updateOneProduct,
  updateUserRole,
} from '@/database';
import { config, logger, messages } from '@/lib';

import { AdminResponseData } from './adminResponseData';

const rolesArray = Object.values(Role);

export const findDahboardInfo = async (
  _req: NextApiRequest,
  res: NextApiResponse<AdminResponseData>
) => {
  try {
    const ordersTotalPromise = countAllOrders();
    const ordersPaidPromise = countPaidOrders();
    const clientsTotalPromise = countAllUsers();
    const productsTotalPromise = countAllProducts();
    const productsOutOfStockPromise = countOutOfStockProducts();
    const productsLowStockPromise = countLowStockProducts();

    const [
      ordersTotal,
      ordersPaid,
      clientsTotal,
      productsTotal,
      productsOutOfStock,
      productsLowStock,
    ] = await Promise.all([
      ordersTotalPromise,
      ordersPaidPromise,
      clientsTotalPromise,
      productsTotalPromise,
      productsOutOfStockPromise,
      productsLowStockPromise,
    ]);

    const ordersPending = ordersTotal - ordersPaid;

    return res.status(200).json({
      ordersTotal,
      ordersPaid,
      ordersPending,
      clientsTotal,
      productsTotal,
      productsOutOfStock,
      productsLowStock,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const getUsers = async (_req: NextApiRequest, res: NextApiResponse<AdminResponseData>) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse<AdminResponseData>) => {
  const { userId = '', role = '' } = req.body;

  try {
    if (!isMongoId(userId)) {
      throw Error(`${messages.USER_NOT_FOUND} [${userId}]`);
    }

    if (!rolesArray.includes(role)) {
      throw Error(`${messages.ROLE_INVALID} [${role}]`);
    }

    await updateUserRole(userId, role);

    return res.status(200).json({ message: messages.USER_ROLE_UPDATED });
  } catch (error) {
    logger.error(error);

    if ((error as Error).message.startsWith(messages.ROLE_INVALID)) {
      return res.status(400).json({ message: (error as Error).message });
    }
    if ((error as Error).message.startsWith(messages.USER_NOT_FOUND)) {
      return res.status(404).json({ message: (error as Error).message });
    }

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const getOrders = async (_req: NextApiRequest, res: NextApiResponse<AdminResponseData>) => {
  try {
    const orders = (await findAllOrders()) as unknown as Order[];

    return res.status(200).json(orders);
  } catch (error) {
    logger.error(error);

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const getProducts = async (
  _req: NextApiRequest,
  res: NextApiResponse<AdminResponseData>
) => {
  try {
    const products = (await findManyProductsSortByTitle()) as unknown as Product[];

    return res.status(200).json(products);
  } catch (error) {
    logger.error(error);

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

export const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<AdminResponseData>
) => {
  const { images = [] } = req.body as Product;

  if (typeof req.body.inStock === 'string') {
    req.body.inStock = req.body.inStock === '' ? 0 : Number(req.body.inStock);
  }

  if (typeof req.body.price === 'string') {
    req.body.price = req.body.price === '' ? 0 : Number(req.body.price);
  }

  try {
    if (!images || images.length < 2) {
      throw Error(messages.PRODUCT_IMG_MINIMUM);
    }

    const product = await createOneProduct(req.body);

    return res.status(200).json(product);
  } catch (error) {
    logger.error(error);

    if ((error as Error).message.startsWith(messages.PRODUCT_IMG_MINIMUM)) {
      return res.status(400).json({ message: (error as Error).message });
    }

    return res.status(500).json({
      message: axios.isAxiosError(error) ? error.response?.data.message : messages.SERVER_ERROR,
    });
  }
};

export const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<AdminResponseData>
) => {
  const { id, slug, title, price, description, images, inStock, gender, sizes, tags, type } =
    req.body as Product;

  try {
    if (!isMongoId(id)) {
      throw Error(`${messages.PRODUCT_NOT_FOUND} [${id}]`);
    }

    if (images.length < 2) {
      throw Error(`${messages.PRODUCT_IMG_MINIMUM} [${id}]`);
    }

    const productImagesPromise = findProductImages(id);

    const productPromise = updateOneProduct(id, {
      slug,
      title,
      price,
      description,
      images,
      inStock,
      gender,
      sizes,
      tags,
      type,
    });

    const [productImages, product] = await Promise.all([productImagesPromise, productPromise]);

    productImages!.images.map(async (img) => {
      if (!images.includes(img)) {
        const [fileId] = img.substring(img.lastIndexOf('/') + 1).split('.');
        await cloudinary.uploader.destroy(`${config.CLOUDINARY_FOLDER}/${fileId}`);
      }
    });

    return res.status(200).json(product);
  } catch (error) {
    logger.error(error);

    if ((error as Error).message.startsWith(messages.PRODUCT_NOT_FOUND)) {
      return res.status(404).json({ message: (error as Error).message });
    }
    if ((error as Error).message.startsWith(messages.PRODUCT_IMG_MINIMUM)) {
      return res.status(400).json({ message: (error as Error).message });
    }

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};

const saveFile = async (file: formidable.File) => {
  // const data = await readFile(file.filepath);
  // await writeFile(`./public/${file.originalFilename}`, data);
  // await unlink(file.filepath);

  const { secure_url } = await cloudinary.uploader.upload(file.filepath, {
    folder: config.CLOUDINARY_FOLDER,
  });
  // logger.info(data);

  return secure_url;
};

const parseFiles = (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, _fields, files) => {
      // logger.info({ error, fields, files });
      if (error) return reject(error);

      const filepath = await saveFile(files.file as formidable.File);
      resolve(filepath);
    });
  });
};

export const uploadImages = async (
  req: NextApiRequest,
  res: NextApiResponse<AdminResponseData>
) => {
  try {
    const imgUrl = await parseFiles(req);

    return res.status(200).json({ image: imgUrl });
  } catch (error) {
    logger.error(error);
    if ((error as Error).message.startsWith(messages.PRODUCT_NOT_FOUND)) {
      return res.status(404).json({ message: (error as Error).message });
    }
    if ((error as Error).message.startsWith(messages.PRODUCT_IMG_MINIMUM)) {
      return res.status(400).json({ message: (error as Error).message });
    }

    return res.status(500).json({ message: messages.SERVER_ERROR });
  }
};
