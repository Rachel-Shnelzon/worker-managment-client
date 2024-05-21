import { forwardRef, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Card, Dialog, TextField, Button, Select, MenuItem, FormControl, FormLabel } from '@mui/material';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { CheckBox } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import workerService from '../data/workerService';
import roleService from '../data/roleService';

const EditWorker = ({ worker }) => {
    const [update, setUpdate] = useState(true);
    useEffect(() => {
        console.log(worker);
        if (worker === null) {
            setUpdate(false);
        }
    }, [worker]);

    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, setValue, control, formState: { errors },watch } = useForm();
    useEffect(() => {
        setValue('firstName', worker?.firstName || '')
        setValue('familyName', worker?.familyName || '')
        setValue('Identity', worker?.identity || '')
        setValue('gender', worker?.gender || '')
        setValue('dateOfBirth', worker?.dateOfBirth || '')
        setValue('startWorkDate', worker?.startWorkDate || '')
        setValue('roles', worker?.roles || [])
    }, [worker, setValue])

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'roles',
    })

    const onSubmit = async data => {
        if (update) {
            await workerService.UpdateWorker(worker.id, data);
        } else {
            workerService.AddWorker(data);
        }

        handleClose();
    }

    const Transition = forwardRef(function Transition(ref) {
        return <Slide direction="up" ref={ref} />;
    });

    const rolesData = roleService.data;
    const assignedRoleNames = fields.map((f) => f.roleName); // Get all currently assigned role names
    const availableRoles = rolesData.filter((role) => !assignedRoleNames.includes(role.name)); // Filter out roles that are already assigned
    console.log("availableRoles");
    console.log(availableRoles);
    console.log("rolesData");
    console.log(rolesData);
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition.ref} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppBar sx={{ position: 'fixed' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Worker
                        </Typography>
                        <Button autoFocus color="inherit" type="submit">
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <br></br>
                <br></br>
                <br></br>
                <Card
                    component="form"
                    sx={{
                        height: '100vh',
                        p: 3,
                        direction: 'ltr',
                    }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    noValidate
                    autoComplete="off"

                >

                    <FormControl>
                        <TextField
                            variant="standard"
                            label="Identity"
                            {...register('Identity', {
                                required: 'Identity is required',
                                pattern: {
                                    value: /^\d{9}$/,
                                    message: 'Identity must be exactly 9 digits'
                                }
                            })}
                            error={Boolean(errors.Identity)}
                            helperText={errors.Identity ? errors.Identity.message : ''}
                            type="text"
                            sx={{ width: '50ch', mb: 2.5,direction: 'ltr'}}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            variant="standard"
                            label="firstName"
                            {...register('firstName', {
                                required: 'First name is required',
                                minLength: { value: 2, message: 'First name must be at least 2 characters' }
                            })}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                            type="text"
                            sx={{ width: '50ch', mb: 2.5,direction: 'ltr'}}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            variant="standard"
                            label="familyName"
                            {...register('familyName', {
                                required: 'family name is required',
                                minLength: { value: 2, message: 'family name must be at least 2 characters' }
                            })}
                            error={Boolean(errors.familyName)}
                            helperText={errors.familyName ? errors.familyName.message : ''}
                            type="text"
                            sx={{ width: '50ch', mb: 2.5,direction: 'ltr'}}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            variant="standard"
                            label="dateOfBirth"
                            {...register('dateOfBirth', { required: true })}
                            error={errors.dateOfBirth ? true : false}
                            helperText={errors.dateOfBirth ? 'This field is required' : ''}
                            type="dateTime-local"
                            sx={{ width: '50ch', mb: 2.5,direction: 'ltr'}}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            variant="standard"
                            label="startWorkDate"
                            {...register('startWorkDate', {
                                required: 'Start work date is required',
                                validate: {
                                    laterThanDateOfBirth: (value) => {
                                        if (!value) return true; // Return true if the field is empty
                                        const dateOfBirth = new Date(watch ('dateOfBirth'));
                                        const startWorkDate = new Date(value);
                                        return startWorkDate > dateOfBirth || 'Start work date must be later than date of birth';
                                    }
                                }
                            })}
                            error={Boolean(errors.startWorkDate)}
                            helperText={errors.startWorkDate ? errors.startWorkDate.message : ''}
                            type="dateTime-local"
                            sx={{ width: '50ch', mb: 2.5,direction: 'ltr'}}
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel >gender</InputLabel>
                        <Select
                            variant="standard"
                            labelId="gender-select-label"
                            id="gender-select"
                            {...register("gender", { required: true }, { valueAsNumber: true })}
                            error={errors.startWorkDate ? true : false}
                            helperText={errors.gender ? 'This field is required' : ''}
                            defaultValue={worker?.gender !== undefined ? worker.gender : ''}
                            sx={{ width: '49ch', mb: 2.5,direction: 'ltr'}}
                        >
                            <MenuItem value={1}>male</MenuItem>
                            <MenuItem value={2}>female</MenuItem>
                        </Select>
                    </FormControl>


                    <Typography variant="h6">Roles</Typography>

                    <Tooltip title="add role">
                        <IconButton aria-label="edit" sx={{ width: '4ch' }} onClick={() =>
                            append({ roleName: '', isManagerial: false, entryDate: '' })
                        }>
                            <AddCircleOutlineIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    {console.log("fields")}
                    {console.log(fields)}
                    {fields?.map((field, index) => (
                        <div key={field.id}>
                            <FormControl>
                                <InputLabel>role</InputLabel>
                                <Select
                                    {...register(`roles.${index}.roleName`, { valueAsNumber: true })}
                                    error={errors.roles.index.roleName ? true : false}
                                    helperText={errors.roles.index.roleName ? 'This field is required' : ''}
                                    variant="standard"
                                    lable="role"
                                    sx={{ width: '25ch', mb: 2.5,direction: 'ltr',padding:'3vw'}}
                                >
                                    {rolesData.map(role => (
                                        <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Is Managerial</FormLabel>
                                <CheckBox
                                    defaultChecked={field?.isManagerial}
                                    {...register(`roles.${index}.isManagerial`)}
                                    
                                    color="primary"
                                    sx={{ width: '25ch', mb: 2.5,direction: 'ltr',padding:'3vw'}}
                                />
                            </FormControl>

                            <FormControl>
                                <TextField
                                    {...register(`roles.${index}.entryDate`, {
                                        required: 'Start work date is required',
                                        validate: {
                                            laterThanDateOfBirth: (value) => {
                                                if (!value) return true; // Return true if the field is empty
                                                const startWorkDate = new Date(watch ('startWorkDate'));
                                                const entryDate = new Date(value);
                                                return entryDate >= startWorkDate || 'Start work date must be later than date of birth';
                                            }
                                        }
                                    })}
                                    error={Boolean(errors.startWorkDate)}
                                    helperText={errors.startWorkDate ? errors.startWorkDate.message : ''}
                                    variant="standard"
                                    label="date"
                                    type="datetime-local"
                                    sx={{ width: '25ch', mb: 2.5,direction: 'ltr',padding:'3vw'}}
                                />
                            </FormControl>

                            <IconButton aria-label="delete" onClick={() => remove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}
                </Card>
            </form>
        </Dialog>
    );
};

export default EditWorker;