import { ToastContainer } from 'react-toastify'

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastClassName="font-sans text-xs p-4 bg-white border-2 border-black shadow-pixel m-4 "
      bodyClassName="font-sans"
      limit={3}
    />
  )
}
