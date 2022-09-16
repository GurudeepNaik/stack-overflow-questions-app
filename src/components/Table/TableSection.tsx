import { useEffect, useState } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import FilterSection from './FilterSection';
import './Style.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { baseUrl } from '../../constants/constants'

type TableSectionTypes = {
  question_id: number;
  owner: {
    display_name: string;
    profile_image: string;
    link: string;
    user_id: number;
  };
  title: string
}

const TableSection = () => {
  const [data, setData] = useState([]);
  const [myUrl, setmyUrl] = useState("");
  const [Popup, setPopup] = useState({
    id: 0,
    col1: 0,
    col2: "",
    col3: "",
    img: "",
    link: "",
    ownerId: 0
  })
  const [isModelOpen, setIsModelOpen] = useState(false);

  const getQuestions = (url: string) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setData(data.items)
      })
      .catch((err) => {
        setData([]);
        console.log(err)
      })
  }

  useEffect(() => {
    const url: string = `${baseUrl}?order=desc&sort=activity&site=stackoverflow`
    const array = url.split(".com")
    setmyUrl(array[1])
    getQuestions(url)
  }, [])

  const myData = data.length > 0 ? data.map((data: TableSectionTypes, i) => {
    const { question_id, title, owner } = data
    return {
      id: i,
      col1: question_id,
      col2: owner.display_name,
      col3: title,
      img: owner.profile_image,
      link: owner.link,
      ownerId: owner.user_id
    }
  }) : []

  const rows: GridRowsProp = myData
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Question ID', width: 150 },
    { field: 'col2', headerName: 'Name', width: 150 },
    { field: 'col3', headerName: 'Question', width: 700 },
  ];


  const getUrl = (filterData: any) => {
    if (filterData.page < 1) {
      alert("Please Add A Valid Page");
      filterData.page = 1;
    }
    if (filterData.pagesize < 1) {
      alert("Please Add A Valid Page Size");
      filterData.pagesize = 1;
    }
    let url = `${baseUrl}?order=desc&sort=${filterData.sort}&site=stackoverflow&page=${filterData.page}&pagesize=${filterData.pagesize}`;
    if (filterData.tagged !== "") {
      url = url + `&tagged=${filterData.tagged}`
    }
    return url
  }


  const onSubmitHandler = (filterData: any) => {
    const url = getUrl(filterData);
    const array = url.split(".com")
    setmyUrl(array[1])
    getQuestions(url);
  }


  const handleRowClick = (rowData: any) => {
    setPopup(rowData)
    handleOpen()
  }



  const handleClose = () => setIsModelOpen(false);
  const handleOpen = () => setIsModelOpen(true);


  return (
    <>
      <FilterSection setState={onSubmitHandler} />

      <input
        className='urlInput'
        type='text'
        value={myUrl}
        readOnly={true}
      />

      {data.length > 0 ? (<div style={{ height: 600, width: '90%', margin: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          autoHeight
          onRowClick={(rowData) => handleRowClick(rowData.row)}
        />
        <Modal
          open={isModelOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="Boxstyle">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h2 className='OwnerID'>Owner ID:{Popup.ownerId}</h2>
              <img className='OwnerIMG' src={Popup.img} alt="Owner" />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <a className='OwnerLink' href={Popup.link} target="_blanck">Page Link</a>
            </Typography>
          </Box>
        </Modal >
      </div >) : (<div className='spinner'><CircularProgress className='roller' /></div>)}
    </>
  )
}

export default TableSection