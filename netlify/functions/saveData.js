import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { title, profileData, links } = JSON.parse(event.body)
    
    const { error } = await supabase
      .from('profile_data')
      .upsert({
        id: 1,
        title,
        user_icon: profileData.userIcon,
        user_name: profileData.userName,
        user_comment: profileData.userComment,
        links,
      })

    if (error) throw error

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved successfully' })
    }
  } catch (error) {
    console.error('Error saving data:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save data' })
    }
  }
}