import { useState, useRef } from 'react';
import {Box, Modal, Slider, Stack} from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import Button from '@mui/material/Button';
interface Props {
  src: File;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setPreview: (blob: Blob) => void;
}
function ProfileAvatarUploadModal({src, modalOpen, setModalOpen, setPreview}: Props) {
  const [slideValue, setSlideValue] = useState(10);

  const cropRef = useRef(null);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSlideValue(newValue as number);
  };

  const handleImageSave = async () => {
    if (cropRef) {
      const dataUrl = (cropRef.current! as any).getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(blob);
      setModalOpen(false);
    }
  };

  return (
    <Modal sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} open={modalOpen}>
      <Stack sx={{width: '300px', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: '100%', height: '100%' }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        <Slider
          min={10}
          max={50}
          sx={{width: '80%'}}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={handleSliderChange}
        />
        <Box
          sx={{
            display: 'flex',
            p: 1,
          }}
        >
          <Button
            size="small"
            sx={{ color: 'white', background: '#ff9800',  ':hover': {backgroundColor: '#ff9800'}, borderColor: 'white' }}
            variant="contained"
            onClick={() => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ color: 'white', background: 'primary.main', ':hover': {backgroundColor: 'primary.main'}, marginLeft: '10px' }}
            size="small"
            variant="contained"
            onClick={handleImageSave}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
}

export default ProfileAvatarUploadModal;
