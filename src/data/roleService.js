import axios from 'axios';
import { observable, action, makeObservable, runInAction} from 'mobx';
import React from 'react';

class RoleService extends React.Component{
    data = [];
    role = null;  
    baseURL = "https://localhost:7039/api/Role/";
    constructor() {
        super(); 
        makeObservable(this, {
            data: observable,
            role:observable,
            getData: action,
            getById: action,
            deleteRole: action,
            UpdateRole: action,
            AddRole:action
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
                        this.role = res.data;
                        console.log("getById "+id);
                        resolve();
                    });
                } else {
                    reject(new Error("Failed to get role"));
                }
            }).catch(error => reject(error));
        });
    }

    AddRole(role){
        axios.get(this.baseURL, role).then((res) => {
            if(res.status === 200){
                runInAction(() => {
                    this.data=[...this.data, res.data]
                    console.log("AddRole "+role);
                    console.log(role);
                });
            } 
        })
    }

    async UpdateRole(id, role) {
       await this.getById(id);
        console.log("update!")
        console.log(role)
        axios.put(this.baseURL+`${id}`, role).then((res)=>{
            if(res.status!==200){
                console.log("Update failed!")
            }
        })
    }

    deleteRole(id){
        console.log("delete in service")
        console.log(id);
        axios.delete(this.baseURL+`${id}`).then((res)=>{
            console.log(res.status);
        })
    }
}
export default new RoleService();