import React, { useState } from 'react'
import { Link } from '../types'
import { Save, X, Upload } from 'lucide-react'

interface EditLinkFormProps {
  link: Link
  updateLink: (link: Link) => void
  cancelEdit: () => void
}

const EditLinkForm: React.FC<EditLinkFormProps> = ({ link, updateLink, cancelEdit }) => {
  const [name, setName] = useState(link.name)
  const [url, setUrl] = useState(link.url)
  const [icon, setIcon] = useState(link.icon)
  const [comment, setComment] = useState(link.comment || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && url && icon) {
      updateLink({ name, url, icon, comment })
    }
  }

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIcon(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">リンクを編集</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          SNS名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
          アイコン
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label htmlFor="icon-upload" className="flex items-center justify-center px-4 py-2 border border-gray-300 border-l-0 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            アップロード
          </label>
          <input
            id="icon-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleIconUpload}
          />
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          コメント
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Save className="w-5 h-5 mr-2" />
          保存
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <X className="w-5 h-5 mr-2" />
          キャンセル
        </button>
      </div>
    </form>
  )
}

export default EditLinkForm