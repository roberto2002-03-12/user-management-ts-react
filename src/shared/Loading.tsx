import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress style={{ color: '#3F53FE' }} />
      <p>Loading...</p>
    </div>
  )
}
