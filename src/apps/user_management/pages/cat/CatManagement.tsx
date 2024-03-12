import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useCatApi } from '../../hooks/useCatApi';
import { 
  useInfiniteQuery, 
  useQueryClient 
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { NavBar } from '../../components';
import { CatList } from '../../components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import '../../styles/CatStyle.css';
import { ICatFiltersInputs } from '../../models';
import CircularProgress from '@mui/material/CircularProgress';

const standardStyle = {
  width: '180px',
  marginLeft: '15px',
  marginRight: '15px',
  margin: '10px'
}

const inputLabelStyle = {
  style: {
    fontSize: '12px'
  }
}

export const CatManagement = () => {
  const { getCats } = useCatApi();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<ICatFiltersInputs>();
  const [catFilters, setCatFilters] = useState<ICatFiltersInputs>({});

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<ICatFiltersInputs> = (data) => {
    if (data.highestPrice === '' && data.minimumPrice === '' && data.name === '' && data.race === '') return;
    setCatFilters({ ...data })
  };

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['cats', catFilters],
    queryFn: async ({ pageParam }) => {
      const dataInputs = catFilters;
      dataInputs.page = pageParam;
      return await getCats(dataInputs);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = typeof lastPage !== 'undefined' && lastPage.data.length > 0 ? allPages.length + 1 : undefined;
      console.log('next page: ', nextPage)
      return nextPage;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  // Efecto para forzar una nueva carga de datos al restablecer los filtros
  useEffect(() => {
    if (status === 'success' && catFilters && Object.keys(catFilters).length === 0) {
      fetchNextPage();
    }
  }, [status, catFilters, fetchNextPage]);

  return (
    <>
      <NavBar />
      <div className="container cat-container">
        <div className="cat-title-filters">
          <h5>Cat filters</h5>
          <Button
            variant='outlined'
            size='small'
          >
            <Link
              to={'/user-management/cat/create'}
              style={{ textDecoration: 'none' }}
            >
              Create cat
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cat-filters">
            <TextField
              variant='filled'
              {
              ...register('name', {
                required: false
              })
              }
              sx={standardStyle}
              InputLabelProps={inputLabelStyle}
              size='small'
              label='Cat name'
              placeholder='Mr. Fresh'
            />
            <TextField
              variant='filled'
              {
              ...register('race', {
                required: false
              })
              }
              sx={standardStyle}
              InputLabelProps={inputLabelStyle}
              size='small'
              label='Race cat'
              placeholder='Orange Tabby'
            />
            <TextField
              variant='filled'
              {
              ...register('minimumPrice', {
                required: false
              })
              }
              sx={standardStyle}
              InputLabelProps={inputLabelStyle}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              size='small'
              label='Minimum price'
              placeholder='S/. 100.00'
              type='number'
            />
            <TextField
              variant='filled'
              {
              ...register('highestPrice', {
                required: false
              })
              }
              sx={standardStyle}
              InputLabelProps={inputLabelStyle}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              size='small'
              label='Highest price'
              placeholder='S/. 40000.00'
              type='number'
            />
          </div>
          <div className="cat-buttons">
            <Button
              variant='contained'
              type='submit'
              size='small'
            >
              Apply filters
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => {
                reset();
                // add this if you want to delete all data cache when clicked
                queryClient.resetQueries({ queryKey: ['cats'], exact: false });
                setCatFilters({});
              }}
              disabled={ Object.values(catFilters).every(value => value !== '' && value !== null && value !== undefined) }
            >
              Reset filters
            </Button>
            <Button variant='contained' size='small' onClick={() => fetchNextPage()}>
              Load again
            </Button>
          </div>
        </form>
        {
          status === 'pending' ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
              <CircularProgress color="inherit" />
            </div>
          ) : status === 'error' ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
              <WifiTetheringErrorIcon color="error" />
            </div>
          ) : (
            <>
              <CatList cats={data!.pages.flatMap(value => value!.data)} innerRef={ref} />
              {
                isFetchingNextPage && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px' }}>
                    <CircularProgress color="inherit" />
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}
