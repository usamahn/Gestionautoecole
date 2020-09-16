import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import {getClients} from "../Services/ClientServices"



export default function ClinetAutocompleteInput(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await getClients()

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
      
      onChange={(e,v)=>{if (v != null) {props.setCinEleve(v.cin_Eleve);props.setEleveAutocompleteValue(v)}}}
      value={props.eleveAutocompleteValue}
      getOptionSelected={(option, value) => (option.cin_Eleve === value.cin_Eleve)}
      getOptionLabel={(option) => option.prenom+" "+option.nom}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Nom du l'eleve"
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

      renderOption={(option)=>(
        <div>
          {option.prenom+ " "+option.nom}<br/>
          <small><i>{"CIN: "+option.cin_Eleve}</i></small>
          

        </div>
      )}
    />
  );
}