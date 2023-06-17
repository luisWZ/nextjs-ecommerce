import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Gender, type Product, ValidSizes, ValidTypes } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '@/components/layouts';
import { findProductById } from '@/database';
import { config, messages, routes, tesloApi } from '@/lib';

const validTypes = Object.values(ValidTypes);
const validGender = Object.values(Gender);
const validSizes = Object.values(ValidSizes);

type FormData = Pick<
  Product,
  | 'id'
  | 'description'
  | 'images'
  | 'inStock'
  | 'price'
  | 'sizes'
  | 'slug'
  | 'tags'
  | 'title'
  | 'type'
  | 'gender'
>;

interface AdminProductEditPageProps {
  product: Product;
}

const AdminProductEditPage = ({ product }: AdminProductEditPageProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: product,
  });
  const { errors } = formState;

  useEffect(() => {
    const subscription = watch((value, { name /* , type */ }) => {
      if (name === 'title') {
        const nextSlug =
          value.title?.trim().replaceAll(' ', '_').replaceAll("'", '').toLowerCase() || '';

        setValue('slug', nextSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const onChangeSize = (size: ValidSizes) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }

    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onChangeNewTag = ({ target }: ChangeEvent<HTMLInputElement>) => setNewTag(target.value);

  const onKeyupNewTag = ({ key, target }: KeyboardEvent) => {
    if (key === ' ' || key === 'Spacebar') {
      const newTag = (target as HTMLInputElement).value.trim().toLowerCase();
      const tags = getValues('tags');
      setNewTag('');

      if (tags.includes(newTag)) return;

      setValue('tags', [...tags, newTag]);
    }
  };

  const onDeleteTag = (tag: string) => {
    const nextTags = getValues('tags').filter((t) => t !== tag);
    setValue('tags', nextTags, { shouldValidate: true });
  };

  const onChangeFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || !target.files.length) return;

    try {
      for (const file of target.files) {
        const imgFormData = new FormData();
        imgFormData.append('file', file);

        const { data } = await tesloApi.post<{ image: string }>(
          routes.API_ADMIN_UPLOAD,
          imgFormData
        );
        setValue('images', [...getValues('images'), data.image], { shouldValidate: true });
      }
    } catch (error) {}
  };

  const onClickDeleteImg = async (image: string) => {
    setValue(
      'images',
      getValues('images').filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (formData: FormData) => {
    if (formData.images.length < 2) return alert(messages.PRODUCT_IMG_MINIMUM);
    setIsSaving(true);
    try {
      const { data } = await tesloApi({
        url: routes.API_ADMIN_PRODUCTS,
        method: formData.id ? 'PUT' : 'POST',
        data: formData,
      });

      if (!formData.id) {
        router.replace(`${routes.PAGE_ADMIN_PRODUCTS}/${data.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={'Product'}
      subtitle={`Edit: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Required field',
                minLength: { value: 2, message: 'Two characters minimum' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={5}
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'Required field',
                minLength: { value: 2, message: 'Two characters minimum' },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Stock"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'Required field',
                min: { value: 0, message: "It's possible to add a product with 0 stock" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Required field',
                min: { value: 1, message: 'Minimum value is 1' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) =>
                  setValue('type', target.value as ValidTypes, { shouldValidate: true })
                }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) =>
                  setValue('gender', target.value as Gender, { shouldValidate: true })
                }
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues('sizes').includes(size)} />}
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'Required field',
                validate: (value) =>
                  value.trim().includes(' ') ? 'whitespace is not allowed' : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Label"
              variant="filled"
              onKeyUp={onKeyupNewTag}
              onChange={onChangeNewTag}
              value={newTag}
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add label"
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 2 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Load image
              </Button>

              <input
                ref={fileInputRef}
                onChange={onChangeFileSelected}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: 'none' }}
              />

              {!!(getValues('images').length < 2) && (
                <Chip
                  label="Minimum required images: 2"
                  color="error"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              )}

              <Grid container spacing={2}>
                {getValues('images').map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img.startsWith('https') ? img : `${routes.PUBLIC_PRODUCTS}/${img}`}
                        alt=""
                      />
                      <CardActions>
                        <Button fullWidth color="error" onClick={() => onClickDeleteImg(img)}>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;

  const product =
    id === config.NEW_PRODUCT_ID
      ? {
          slug: '',
          title: '',
          description: '',
          inStock: 0,
          price: 0,
          sizes: [],
          tags: [],
          images: ['img_1.jpg', 'img_2.jpg'],
          type: Object.values(ValidTypes)[0],
          gender: Object.values(Gender)[0],
        }
      : await findProductById(id.toString());

  if (!product) {
    return {
      redirect: {
        destination: routes.API_ADMIN_PRODUCTS,
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default AdminProductEditPage;
