import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

exports.handler = async (event, context) => {
  try {
    const { data, error } = await supabase
      .from('profile_data')
      .select('*')
      .single()

    if (error) throw error

    return {
      statusCode: 200,
      body: JSON.stringify({
        title: data.title,
        profileData: {
          userIcon: data.user_icon,
          userName: data.user_name,
          userComment: data.user_comment,
        },
        links: data.links || [],
      })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    }
  }
}