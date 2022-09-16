import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type SELECTPROPS = {
  setState: React.Dispatch<React.SetStateAction<any>>
}

const FilterSection = (props: SELECTPROPS) => {

  const [filterData, setfilterData] = useState({
    sort: "activity",
    page: 1,
    pagesize: 30,
    tagged: ""
  })

  const { sort, page, pagesize, tagged } = filterData;


  return (

    <form
      onSubmit={(e) => {
        e.preventDefault();
        const obj = {
          page: page,
          pagesize: pagesize,
          sort: sort,
          tagged: tagged
        }
        props.setState(obj)
      }}
    >

      <div className="secondFieldContainer">
        {/* PAGE NUMBER */}
        <TextField
          id="outlined-basic"
          label="Page"
          variant="outlined"
          type="number"
          value={page}
          className="textfield"
          onChange={(e) => setfilterData((pre: any) => ({ ...pre, page: Number(e.target.value) }))}
        />


        {/* PAGE SIZE */}
        <TextField
          id="outlined-basic"
          label="Page-Size"
          variant="outlined"
          type="number"
          value={pagesize}
          className="textfield"
          onChange={(e) => setfilterData((pre: any) => ({ ...pre, pagesize: Number(e.target.value) }))}
        />


        {/* TAGGED */}
        <TextField
          id="outlined-basic"
          label="Tagged"
          variant="outlined"
          type="text"
          value={tagged}
          className="textfield"
          onChange={(e) => setfilterData((pre: any) => ({ ...pre, tagged: e.target.value }))}
        />

        {/* SORT FIELD */}
        <div className="selectField">
          <InputLabel id="demo-simple-select-label">Sort:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            onChange={(e) => setfilterData((pre: any) => ({ ...pre, sort: e.target.value }))}
          >
            <MenuItem value="activity">activity</MenuItem>
            <MenuItem value="votes">votes</MenuItem>
            <MenuItem value="creation">creation</MenuItem>
            <MenuItem value="hot">hot</MenuItem>
            <MenuItem value="week">week</MenuItem>
            <MenuItem value="month">month</MenuItem>
          </Select>
        </div>


        {/* SUBMIT BUTTON */}
        <Button variant="contained" type="submit" className="button">
          Search
        </Button>

      </div>
    </form>
  );
};

export default FilterSection;
