import CircularProgress from '@mui/material/CircularProgress';

export const SmallLoading = () => {
  return (
    <div
      style={{
        height: '100px',
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
      }}
    >
      <CircularProgress style={{ color: '#3F53FE' }} />
      <p>Loading...</p>
    </div>
  )
}
