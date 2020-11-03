import { resolve } from "dns"
import { rejects } from "assert"

export function getauditList(id:string,tab:string): Promise<{
  date: string;
  component: string;
  action: string;
  user: string;
  ipaddress: string;
  environment:string;
}[]> {
  return new Promise((resolve, reject) => {
    setTimeout((id ,tab) => {

      resolve([{
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      
      {
        date: "19 June 2019,04:02 PM",
        component: "Deployed on prod-devtroncd by utkarsh@devtron.ai",
        action: "",
        user: "",
        ipaddress: "",
        environment:""
      },
      
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        environment:"dashboard"
      },
      ]
      )
    }, 1000)
  })
}

export function getenvironmentList(id:string,tab:string): Promise<{
  date: string;
  component: string;
  action: string;
  user: string;
  ipaddress: string;
  application:string
  
}[]> {
  return new Promise((resolve, reject) => {
    setTimeout((id ,tab) => {

      resolve([{
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Update",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application:"dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      }, 
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },
      {
        date: "19 June 2019,04:02 PM",
        component: "User-utkarsh@devtron.ai",
        action: "Create",
        user: "dejon_jones@yahoo.com",
        ipaddress: "203.0.113.6",
        application: "dashboard"
      },     
      ]
      )
    }, 1000)
  })
}

export function  getglobalCofiguration(id:string,tab:string) : Promise<{
  date: string;
  component: string;
  action: string;
  user: string;
  ipaddress: string;
}[]>{
return new Promise((resolve,rejects)=>{
  setTimeout(()=>{
    resolve( [{
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "",
      user: "",
      ipaddress: "",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "",
      user: "",
      ipaddress: "",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Git Account",
      action: "Disable",
      user: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
    }])
  },1000)
  
})

}
export function getuseraccess(id:string,tab:string):Promise<{
  date: string;
  component: string;
  action: string;
  actionby: string;
  ipaddress: string; 
}[]>{
 return new Promise((resolve,reject)=>{
  setTimeout((id ,tab) => {

    resolve([{
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Update",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6",
     
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Create",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "Deployed on prod-devtroncd by utkarsh@devtron.ai",
      action: "",
      actionby: "",
      ipaddress: ""
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Update",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Update",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Enable",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Update",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Create",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    },
    {
      date: "19 June 2019,04:02 PM",
      component: "User-utkarsh@devtron.ai",
      action: "Update",
      actionby: "dejon_jones@yahoo.com",
      ipaddress: "203.0.113.6"
    }

    ]
    )
  }, 1000)
 })
}
