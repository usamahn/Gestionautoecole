import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import {getVoitures} from "../Services/VoitureServices"



export default function VoitureAutocompleteInput(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await getVoitures()

      if (active) {
        setOptions(response.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      
      style={{ width: 300, marginTop:"27px" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      disabled={props.voitureAutocompleteDisabled}
      onChange={(e,v)=>{if (v != null) {props.setImmatriculation(v.immatriculation); props.setVoitueAutocompleteValue(v)}}}
      getOptionSelected={(option, value) => (option.immatriculation === value.immatriculation)  }
      getOptionLabel={(option) => option.marque}
      options={options}
      loading={loading}
      value={props.voitueAutocompleteValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Voiture"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}

      
    />
  );
}