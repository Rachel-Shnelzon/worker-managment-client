import axios from 'axios';
import { observable, action, makeObservable, runInAction} from 'mobx';
import React from 'react';

class WorkerService extends React.Component{
    data = [];
    worker = null;  
    baseURL = "https://localhost:7039/api/workers/";
    constructor() {
        super(); 
        makeObservable(this, {
            data: observable,
            worker:observable,
            getData: action,
            getById: action,
            deleteWorker: action,
            UpdateWorker: action,
            AddWorker:action
        })
        this.getData();
    }

    getData() {
        axios.get(this.baseURL).then(res => {
            runInAction(() => {
                this.data=res.data
            });
        })
    }

    async getById(id){
        return new Promise((resolve, reject) => {
            axios.get(this.baseURL + `${id}`).then((res) => {
                if(res.status === 200){
                    runInAction(() => {
                       
                        this.worker = res.data;
                        console.log("getById "+id);
                        resolve();
                    });
                } else {
                    reject(new Error("Failed to get worker"));
                }
            }).catch(error => reject(error));
        });
    }

    AddWorker(workerToAdd){
        return new Promise((resolve, reject) => {
            axios.post(this.baseURL , workerToAdd).then((res) => {
                if(res.status === 200){
                    runInAction(() => {
                        this.data=[...this.data, res.data]
                        this.worker = res.data;
                        console.log("addWorker ");
                        resolve();
                    });
                } else {
                    reject(new Error("Failed to add worker"));
                }
            }).catch(error => reject(error));
        });
    }

    async UpdateWorker(id, workerToUpdate) {
       await this.getById(id);
        console.log("update!")
        console.log(this.worker)
        console.log(workerToUpdate)
        axios.put(this.baseURL+`${id}`, workerToUpdate).then((res)=>{
            if(res.status!==200){
                console.log("Update failed!")
            }
        })
    }

    deleteWorker(id){
        console.log("delete in service")
        console.log(id);
        axios.delete(this.baseURL+`${id}`).then((res)=>{
            
            console.log(res.status);
        })
    }
}
export default new WorkerService();