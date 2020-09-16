import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import {getMonitorsbyType} from "../Services/MonitorServices"



export default function MonitorAutocompleteInput(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await getMonitorsbyType(props.type)

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
      disabled={props.monitorAutocompleteInputDisabled}
      onChange={(e,v)=>{if (v != null) {props.setCinMoniteur(v.cin_Moniteur); props.setMoniteurAutocompleteValue(v)}}}
      getOptionSelected={(option, value) => (option.prenom === value.prenom) ||(option.cin_Moniteur === value.cin_Eleve) }
      getOptionLabel={(option) => option.prenom+" "+option.nom}
      options={options}
      loading={loading}
      value={props.moniteurAutocompleteValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Nom du Moniteur"
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
          <small><i>{"CIN: "+option.cin_Moniteur}</i></small>
          

        </div>
      )}
    />
  );
}