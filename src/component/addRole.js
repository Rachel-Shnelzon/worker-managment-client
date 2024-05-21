import { Fragment, forwardRef, useEffect, useState } from 'react';
import { Card, Dialog, TextField, Button, Select, MenuItem } from '@mui/material';
import workerService from '../data/workerService';
import { useForm } from 'react-hook-form';
import { toJS } from 'mobx';
import { useParams } from 'react-router-dom';
import Slide from '@mui/material/Slide';

const AddRole = ({  }) => {
    const [update, setUpdate] = useState(true);
    // useEffect(() => {
    //     if(worker === null){
    //         setUpdate(false);
    //     }
    // }, [worker]);

    // const [editedWorker, setEditedWorker] = useState({ ...worker });

    // const handleSubmit = async () => {
    //     await update && workerService.UpdateWorker(worker.id, editedWorker);
    //     !update && workerService.AddWorker(editedWorker);
    // };
    
    const { register, formState: { errors }, } = useForm();

    return (
           <Card
                component="form"
                sx={{
                    height:'100vh',
                    p: 3,
                    direction: 'ltr',
                }}
                style={{ display: 'flex', flexDirection: 'column' }}
                noValidate
                autoComplete="off"
            >
                <Select
                variant="standard"
                required
                    labelId="gender-select-label"
                    id="gender-select"
                    value={1}
                    // defaultValue={editedWorker.gender}
                    // label="gender"
                    // onChange={(e) => setEditedWorker({ ...editedWorker, gender: e.target.value })} 
                    // error={errors.startWorkDate ? true : false}
                    sx={{
                        width: '49ch',
                        mb: 3,
                        direction: 'ltr'
                    }}
                >
                    <MenuItem value={1}>male</MenuItem>
                    <MenuItem value={2}>female</MenuItem>
                </Select>

                <TextField 
                variant="standard"
                required
                    label="startWorkDate" 
                    // defaultValue={editedWorker.startWorkDate} 
                    // onChange={(e) => setEditedWorker({ ...editedWorker, startWorkDate: e.target.value })} 
                    // error={errors.startWorkDate ? true : false}
                    // helperText={errors.startWorkDate ? 'This field is required' : ''}
                    type="dateTime-local"
                    sx={{
                        width: '50ch',
                        mb: 2.5,
                        direction: 'ltr'
                    }}
                />
            </Card>
    );
};

export default AddRole;