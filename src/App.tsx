import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserView from './components/UserView'
import AdminView from './components/AdminView'
import { Link as LinkType, ProfileData } from './types'

function App() {
  const [title, setTitle] = useState<string>('SNSプロフィールリンクカード')
  const [links, setLinks] = useState<LinkType[]>([])
  const [profileData, setProfileData] = useState<ProfileData>({
    userIcon: '',
    userName: '',
    userComment: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/getData')
        if (!response.ok) {
          throw new Error('データの取得に失敗しました')
        }
        const data = await response.json()
        setTitle(data.title || 'SNSプロフィールリンクカード')
        setLinks(data.links || [])
        setProfileData(data.profileData || {
          userIcon: '',
          userName: '',
          userComment: '',
        })
      } catch (error) {
        console.error('データの読み込み中にエラーが発生しました:', error)
      }
    }

    fetchData()
  }, [])

  const saveData = async (newTitle: string, newLinks: LinkType[], newProfileData: ProfileData) => {
    const data = {
      title: newTitle,
      links: newLinks,
      profileData: newProfileData
    }
    
    try {
      const response = await fetch('/.netlify/functions/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('データの保存に失敗しました')
      }
    } catch (error) {
      console.error('データの保存中にエラーが発生しました:', error)
    }
  }

  const addLink = (newLink: LinkType) => {
    const newLinks = [...links, newLink]
    setLinks(newLinks)
    saveData(title, newLinks, profileData)
  }

  const updateLink = (index: number, updatedLink: LinkType) => {
    const newLinks = [...links]
    newLinks[index] = updatedLink
    setLinks(newLinks)
    saveData(title, newLinks, profileData)
  }

  const deleteLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    setLinks(newLinks)
    saveData(title, newLinks, profileData)
  }

  const updateProfileData = (newData: Partial<ProfileData>) => {
    const updatedProfileData = { ...profileData, ...newData }
    setProfileData(updatedProfileData)
    saveData(title, links, updatedProfileData)
  }

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle)
    saveData(newTitle, links, profileData)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserView title={title} links={links} profileData={profileData} />} />
        <Route
          path="/admin"
          element={
            <AdminView
              title={title}
              links={links}
              profileData={profileData}
              addLink={addLink}
              updateLink={updateLink}
              deleteLink={deleteLink}
              updateProfileData={updateProfileData}
              updateTitle={updateTitle}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App