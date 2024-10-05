import React from 'react'
import { Link } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import { Link as LinkType, ProfileData } from '../types'
import { Settings } from 'lucide-react'

interface UserViewProps {
  title: string
  links: LinkType[]
  profileData: ProfileData
}

const UserView: React.FC<UserViewProps> = ({ title, links, profileData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#46B3E0] to-[#B8E9F6] flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#46B3E0] to-[#B8E9F6]">{title}</h1>
        <ProfileCard links={links} profileData={profileData} />
        <Link
          to="/admin"
          className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="管理画面"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

export default UserView