import { useState } from 'react';
import { toJS } from 'mobx';
import { observer } from "mobx-react-lite";
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import workerService from '../data/workerService';
import EditWorker from './editWorker';






const AllWorkers = observer(() => {


    // const [bool, setBool]=useState(false);
    const columns = [
        {
            field: 'identity',
            headerName: 'identity',
            type: 'string',
            width: 150,
        },
        {
            field: 'firstName',
            headerName: 'first name',
            type: 'string',
            width: 150,
        },
        {
            field: 'familyName',
            headerName: 'last name',
            type: 'string',
            width: 150,

        },
        {
            field: 'startWorkDate',
            headerName: 'satrt work date',
            type: 'Date',
            width: 150,
            sortable: true,
            valueGetter: (params) => {
                if (params) {
                    const date = new Date(params);
                    return date.toLocaleDateString();
                }
                return '';
            }
        },
        {
            field: 'delete',
            headerName: '',
            width: 80,
            renderCell: (params) => (
                <Tooltip title="delete worker">
                    <IconButton aria-label="delete" onClick={() => clickDelete(params.row.id)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            )
        }
        ,
        {
            field: 'edit',
            headerName: '',
            width: 80,
            renderCell: (params) => (
                <Tooltip title="edit detailes">
                    <IconButton aria-label="edit" onClick={() => clickEdit(params.row.id)}>
                        < EditIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            )
        }
        ,
        {
            field: 'export',
            headerName: '',
            width: 80,
            renderCell: (params) => (
                <Tooltip title="export to excel">
                    <IconButton aria-label="edit" onClick={() => exportToExcel(params.row.id)}>
                        <BrowserUpdatedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            )
        }

    ];



    const workers = toJS(toJS(workerService.data));

    const [open, setOpen] = useState(false);
    const [worker, setWorker] = useState(null);

    const getRowId = () => index++;

    const clickDelete = (id) => {
        console.log("delete " + id);
        workerService.deleteWorker(id);
    }

    const clickEdit = async (id) => {
        if (id == 0) {
            setWorker(null);
        }
        else {
            await workerService.getById(id);
            const currentWorker = toJS(workerService.worker);
            setWorker(currentWorker)
        }
        setOpen(true);
    }

    let index = 0;
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredWorkers = workers.filter(worker =>
        worker.identity.includes(searchTerm) ||
        worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.familyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportTableToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('All Workers');

        worksheet.columns = [
            { header: 'Id', key: 'identity', width: 15 },
            { header: 'First Name', key: 'firstName', width: 25 },
            { header: 'Last Name', key: 'familyName', width: 25 },
            { header: 'Date of Birth', key: 'dateOfBirth', width: 25 },
            { header: 'Start Work Date', key: 'startWorkDate', width: 25 },
            { header: 'Gender', key: 'gender', width: 25 },
        ];

        filteredWorkers.forEach(worker => {
            worksheet.addRow(worker);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, 'all_workers_details.xlsx');
    };


    const exportToExcel = async (id) => {
        await workerService.getById(id);
        const employee = toJS(workerService.worker);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employee Details');

        worksheet.columns = [
            { header: 'Id', key: 'identity', width: 15 },
            { header: 'first name', key: 'firstName', width: 25 },
            { header: 'last name', key: 'familyName', width: 25 },
            { header: 'date Of Birth', key: 'dateOfBirth', width: 25 },
            { header: 'start Work Date', key: 'startWorkDate', width: 25 },
            { header: 'gender', key: 'gender', width: 25 },
        ];

        worksheet.addRow(employee);

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        FileSaver.saveAs(blob, 'employee_details.xlsx');
    };
    return (
        <div style={{}}>
            <TextField
                type="text"
                placeholder="Search by ID, First Name, or Last Name"
                value={searchTerm}
                onChange={handleChange}
                sx={{ width: '60%', direction: 'ltr', alignContent: "center" }}
            >
            </TextField>
            <br></br>
            <br></br>
            <div>
                <Tooltip title="add worker">
                    <IconButton aria-label="edit" onClick={() => clickEdit(0)}>
                        <AddCircleOutlineIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="export to excel">
                    <IconButton aria-label="edit" onClick={() => exportTableToExcel()}>
                        <BrowserUpdatedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </div>
            <Box sx={{ height: 425, width: '80%', direction: 'ltr', alignContent: "center" }}>
                <DataGrid
                    rows={filteredWorkers}
                    columns={columns}
                    initialState={{
                        pagination: {
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    getRowId={getRowId}
                />
                {open && <EditWorker worker={worker} />}
            </Box>
        </div>
    );

}

);


export default AllWorkers;