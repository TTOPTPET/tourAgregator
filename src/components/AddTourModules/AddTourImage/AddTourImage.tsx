import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  SvgIcon,
} from "@mui/material";
import imageCompression, { Options } from "browser-image-compression";
import { Dispatch, SetStateAction, useState, FC } from "react";
import { baseUrl } from "../../../config/config";
import AddImageLogo from "../../../media/add-image.svg?react";
import DeleteIcon from "../../../media/DeleteCreatorDocumentIcon.svg?react";
import { IAddTour } from "../../../models/addTourModels/IAddTour";
import { deleteToutPhoto } from "../../../API/addTourAPI/deleteToutPhoto";

const MAXIMUM_UPLOAD = 100 * 1024 * 1024;

interface IAddTourImageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
  isEditing: boolean;
}

const resizeOptions: Options = {
  maxSizeMB: 0.3,
  maxWidthOrHeight: 1080,
  useWebWorker: true,
};

export const AddTourImage: FC<IAddTourImageProps> = ({
  images,
  setImage,
  tourInfo,
  setTourInfo,
  isEditing,
}) => {
  const [reader] = useState(new FileReader());

  const fileHandler = async (e: any) => {
    const file = e.target.files[0];
    const resizedFile: File = await imageCompression(file, resizeOptions);
    if (resizedFile) {
      reader.readAsDataURL(resizedFile);
      reader.addEventListener("load", () => {
        if (resizedFile.size > MAXIMUM_UPLOAD) {
          return;
        }
        setImage([reader?.result, ...images]);
      });
      images.pop();
      setImage([...images]);
      setTourInfo({
        ...tourInfo,
        photos: [...(tourInfo.photos || []), resizedFile],
      });
    }
  };
  const handlerDeleteImage = (index: number) => {
    if (isEditing) {
      if (tourInfo?.photos?.includes(images[index])) {
      }
      setImage([
        ...images.filter((item, i) => i !== index),
        {
          src: "",
          loading: true,
        },
      ]);
      setTourInfo({
        ...tourInfo,
        photos: tourInfo?.photos && [
          ...tourInfo?.photos.filter((item, i) => i !== index),
        ],
      });
    } else {
      setImage([
        ...images.filter((item, i) => i !== index),
        {
          src: "",
          loading: true,
        },
      ]);
      setTourInfo({
        ...tourInfo,
        photos: tourInfo?.photos && [
          ...tourInfo?.photos.filter((item, i) => i !== index),
        ],
      });
    }
  };
  return (
    <Stack direction={"row"} gap={1} flexWrap={"wrap"} width={500}>
      <Button variant="addTourImage" component="label">
        <input
          type={"file"}
          accept={".jpg, .jpeg, .png"}
          onChange={fileHandler}
          hidden
        />
        <SvgIcon viewBox="0 0 35 35" fontSize="large">
          <AddImageLogo color="#fff" />
        </SvgIcon>
      </Button>
      {images &&
        images.map((image, index) => (
          <Box
            sx={{ width: 156, height: 156, margin: "0 auto 16px" }}
            key={index}
          >
            {image.loading ? (
              <Skeleton
                variant="rounded"
                sx={{
                  width: 156,
                  height: 156,
                  margin: "0 auto 16px",
                  borderRadius: 8,
                }}
              />
            ) : (
              <>
                {" "}
                <IconButton
                  onClick={() => handlerDeleteImage(index)}
                  sx={{ float: "right", margin: "2px 2px 0 0" }}
                >
                  <DeleteIcon width={20} height={20} />
                </IconButton>
                {console.log(image)}
                <img
                  src={image}
                  alt={`tour`}
                  style={{
                    marginTop: -37,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 25,
                  }}
                />
              </>
            )}
          </Box>
        ))}
    </Stack>
  );
};
