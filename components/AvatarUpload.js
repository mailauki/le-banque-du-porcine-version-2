import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { supabase } from '../utils/supabaseClient';
import { Button } from '@mui/material';

export default function AvatarUpload({ session, avatarUrl, onUpload }) {
  const [avatarImage, setAvatarImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  
  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl)
  }, [avatarUrl])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarImage(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      // const filePath = `${session.user.id}/avatar.${file.type.split("/").pop()}`
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${session.user.id}/${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }
      else onUpload(filePath)

    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      {avatarImage ? (
        <img
          src={avatarImage}
          alt="Avatar"
          id="avatar-image"
          className={styles.avatar}
        />
      ) : (
        <div
          id="avatar-no-image"
          className={styles.avatar}
        />
      )}
      <Button 
        variant="outlined" 
        component="label" 
        htmlFor="avatar"
      >
        {uploading ? 'Uploading ...' : 'Upload'}
      </Button>
      <input  
        id="avatar"
        hidden 
        accept="image/*" 
        type="file"
        onChange={uploadAvatar} 
        disabled={uploading}
      />
    </>
  )
}