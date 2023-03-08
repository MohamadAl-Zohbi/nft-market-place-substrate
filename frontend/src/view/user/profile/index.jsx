import { useState } from "react";
import { TextField, Avatar, Divider, Button } from '@mui/material';
import "./style.css";
import { CloudUpload } from '@mui/icons-material';
import User from "../../../assets/images/robot-one.png"

const UserProfileSettings = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  return (
    <div id="settings">
      <div className="container">
        <div className="container user-profile-settings-container">
          <div className="avatar-upload-container">
            <Avatar
              src={selectedFile ? URL.createObjectURL(selectedFile) : User}
              alt="Profile Picture"
              className="user-profile-image"
              sx={{ width: 120, height: 120 }}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              className="upload-button"
            >
              Upload Image
              <input
                type="file"
                onChange={handleFileSelect}
                hidden
              />
            </Button>
          </div>
          <h1>User Profile Settings</h1>
          <Divider className="user-profile-divider" />
          <form className="user-profile-form">
            <div className="textfield-settings">
              <label>First Name</label>
              <TextField
                margin="dense"
                fullWidth
                name='name'
                size="small"
                placeholder='Enter the NFT title here'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: "var(--light-gray)",
                    borderRadius: '10px',
                    "& input::placeholder": {
                      fontSize: "12px"
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "var(--second-color-hover)",
                    }
                  },
                }}
              />
            </div>
            <div className="textfield-settings">
              <label>Last Name</label>
              <TextField
                margin="dense"
                fullWidth
                name='name'
                size="small"
                placeholder='Enter the NFT title here'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: "var(--light-gray)",
                    borderRadius: '10px',
                    "& input::placeholder": {
                      fontSize: "12px"
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "var(--second-color-hover)",
                    }
                  },
                }}
              />
            </div>
            <div className="textfield-settings">
              <label>Email</label>
              <TextField
                margin="dense"
                fullWidth
                name='name'
                size="small"
                placeholder='Enter the NFT title here'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: "var(--light-gray)",
                    borderRadius: '10px',
                    "& input::placeholder": {
                      fontSize: "12px"
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "var(--second-color-hover)",
                    }
                  },
                }}
              />
            </div>
            <Button className="settings-button">
              Save Changes
            </Button>
        </form>
        <h2>Change Password</h2>
        <Divider className="user-profile-divider" />
        <form className="user-profile-form">
          <div className="textfield-settings">
          <label>Current Password</label>
          <TextField
            margin="dense"
            fullWidth
            name='name'
            size="small"
            type='password'
            placeholder='Enter the NFT title here'
            sx={{
              '& .MuiOutlinedInput-root': {
                background: "var(--light-gray)",
                borderRadius: '10px',
                "& input::placeholder": {
                  fontSize: "12px"
                },
                '&.Mui-focused fieldset': {
                  borderColor: "var(--second-color-hover)",
                }
              },
            }}
          />
        </div>
        <div className="textfield-settings">
          <label>New Password</label>
          <TextField
            margin="dense"
            fullWidth
            name='name'
            size="small"
            type='password'
            placeholder='Enter the NFT title here'
            sx={{
              '& .MuiOutlinedInput-root': {
                background: "var(--light-gray)",
                borderRadius: '10px',
                "& input::placeholder": {
                  fontSize: "12px"
                },
                '&.Mui-focused fieldset': {
                  borderColor: "var(--second-color-hover)",
                }
              },
            }}
          />
        </div>
        <div className="textfield-settings">
          <label>Confirm Password</label>
          <TextField
            margin="dense"
            fullWidth
            name='name'
            size="small"
            type='password'
            placeholder='Enter the NFT title here'
            sx={{
              '& .MuiOutlinedInput-root': {
                background: "var(--light-gray)",
                borderRadius: '10px',
                "& input::placeholder": {
                  fontSize: "12px"
                },
                '&.Mui-focused fieldset': {
                  borderColor: "var(--second-color-hover)",
                }
              },
            }}
          />
        </div>
          <Button className="settings-button">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
    </div>
  )
};

export default UserProfileSettings;

