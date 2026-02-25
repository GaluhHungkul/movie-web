import useUser from '@/store/useUser'
import PhotoProfile from './PhotoProfile'
import DialogEditProfile from './DialogEditProfile'

const MyProfileCard = () => {

  const { user } = useUser()

  return (
    <div className='md:order-[-1] lg:flex-1'>
      <h1>My Profile</h1>
      <section className='flex mt-10 mb-4 gap-4 items-center'>
        <PhotoProfile image={user?.image}/>
        <div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
        <DialogEditProfile />
      </section>
    </div>
  )
}

export default MyProfileCard