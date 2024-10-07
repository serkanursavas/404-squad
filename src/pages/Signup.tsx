import { Link } from 'react-router-dom'
import { SignupFormValues } from '../types/FormTypes'
import SignupForm from '../components/form/SignupForm'

export default function Signup() {
  const handleSubmit = (values: SignupFormValues) => {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-8 py-24 bg-white xs:py-12">
      <div className="flex flex-col justify-around min-h-screen space-y-6">
        <div>
          <div className="mb-20 text-3xl text-center text-primary xs:mb-16 xs:text-4xl">Create an account</div>
          <SignupForm handleSubmit={handleSubmit} />
          <div className="mt-5 text-[9px] xs:text-[10px] space-x-2 xs:space-x-6 ">
            <span>Already have an account?</span>
            <Link
              className="text-primary"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
