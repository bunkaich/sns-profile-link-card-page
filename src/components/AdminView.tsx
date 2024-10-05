import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import AddLinkForm from './AddLinkForm'
import EditLinkForm from './EditLinkForm'
import { Link as LinkType, ProfileData } from '../types'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'

interface AdminViewProps {
  title: string
  links: LinkType[]
  profileData: ProfileData
  addLink: (link: LinkType) => void
  updateLink: (index: number, link: LinkType) => void
  deleteLink: (index: number) => void
  updateProfileData: (data: Partial<ProfileData>) => void
  updateTitle: (title: string) => void
}

const AdminView: React.FC<AdminViewProps> = ({
  title,
  links,
  profileData,
  addLink,
  updateLink,
  deleteLink,
  updateProfileData,
  updateTitle
}) => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('パスワードが間違っています。')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#46B3E0] to-[#B8E9F6] flex items-center justify-center p-4">
        <form onSubmit={handleAuthentication} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">管理者認証</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="パスワードを入力"
          />
          <button type="submit" className="w-full bg-[#46B3E0] text-white p-2 rounded hover:bg-[#3DA2CF] transition-colors duration-200">
            ログイン
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#46B3E0] to-[#B8E9F6] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">管理画面</h1>
          <Link to="/" className="text-[#46B3E0] hover:text-[#3DA2CF] transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="mb-4">
          <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-1">
            サイトタイトル
          </label>
          <input
            type="text"
            id="siteTitle"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#46B3E0] focus:border-[#46B3E0]"
          />
        </div>
        <ProfileCard
          links={links}
          profileData={profileData}
          updateProfileData={updateProfileData}
          isAdminView
        />
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">リンク管理</h3>
          {links.map((link, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2">
              <span>{link.name}</span>
              <div>
                <button
                  onClick={() => setEditingIndex(index)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {editingIndex !== null ? (
          <EditLinkForm
            link={links[editingIndex]}
            updateLink={(updatedLink) => {
              updateLink(editingIndex, updatedLink)
              setEditingIndex(null)
            }}
            cancelEdit={() => setEditingIndex(null)}
          />
        ) : (
          <AddLinkForm addLink={addLink} />
        )}
      </div>
    </div>
  )
}

export default AdminView