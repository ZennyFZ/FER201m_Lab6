import { Card, Button } from "react-materialize";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {addUser} from "./Users";
import { nanoid } from "@reduxjs/toolkit";
import * as Yup from "yup";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  Typography
} from "@mui/material";

export default function AddContact() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      major: 0,
      message: "",
      agree: false
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      major: Yup.string().required("Required").typeError("Please select a major."),
      message: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf([true],"The terms and conditions must be accepted.")
    }),

    onSubmit: (values) => {
      console.log(values);
      dispatch(addUser(values));
      formik.resetForm();
    }
  });

  return (
    <Card style={{ width: "400px" }}>
      <h4 style={{textAlign: 'center'}}>Contact Form</h4>
      <form onSubmit={formik.handleSubmit}>

      <div type="hidden" name="id" value={formik.values.id=nanoid()} onChange={formik.handleChange}/>

      <div>
        <label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        </label>
      </div>
      {formik.errors.name && formik.touched.name && (<p>{formik.errors.name}</p>)}

      <div>
      <label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </label>
      </div>
      {formik.errors.email && formik.touched.email && (<p>{formik.errors.email}</p>)}

      <div>
      <label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </label>
      </div>
      {formik.errors.phone && formik.touched.phone && (<p>{formik.errors.phone}</p>)}

      <div>
      <FormControl sx={{ m: 1, minWidth: 350 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Program of Study
        </InputLabel>
        <Select
          type="text"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="Program of study"
          name="major"
          value={formik.values.major}
          onChange={formik.handleChange}
        >
          <MenuItem value={0}>
            <em>Please select</em>
          </MenuItem>
          <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
          <MenuItem value={'Information System'}>Information System</MenuItem>
          <MenuItem value={'Information Assurance'}>Information Assurance</MenuItem>
          <MenuItem value={'Internet of Things'}>Internet of Things</MenuItem>
          <MenuItem value={'Artificial Intelligence'}>Artificial Intelligence</MenuItem>
          <MenuItem value={'Digital Art & Design'}>Digital Art & Design</MenuItem>
        </Select>
      </FormControl>
      </div>
      {formik.errors.major && (
          <Typography variant="caption" color="red">
            {formik.errors.major}
          </Typography>
        )}

      <div>
      <TextField
        type="text"
        style={{ width: "350px" }}
        id="outlined-multiline-static"
        label="Message"
        multiline
        name="message"
        rows={4}
        value={formik.values.message}
        onChange={formik.handleChange}
      />
      </div>
      {formik.errors.message && formik.touched.message && (<p>{formik.errors.message}</p>)}

      <div>
      <FormControlLabel
        control={
          <Checkbox
            label="Agree to terms and conditions."
            checked={formik.values.agree}
            onChange={formik.handleChange}
            name="agree"
          />
        }
        label="I agree to the terms and conditions"
      />
      </div>
      {formik.errors.agree && (<Typography variant="caption" color="red">{formik.errors.agree}</Typography>)}

      <div>
        <Button
        style={{ width: "350px", marginTop: "28px" }}
        waves="light"
        type="submit"
        >
          Add Contact
        </Button>
      </div>

      </form>
    </Card>
  );
}
