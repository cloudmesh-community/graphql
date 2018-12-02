import Login from "../smart-views/login";
import App from "../smart-views/app";
import VMs from "../smart-views/vms";
import Images from "../smart-views/images";
import dispatcher from "../util/dispatcher";

export default class ApplicationRouter {
    constructor () {
        this.routes = {
            "login": this.login,
            "app": this.app,
            "selectvm": this.vms,
            "images": this.images
        };
    }

    navigate(route) {
        this.routes[route]();
    }

    login() {
        if(!this.loginView){
            this.loginView = new Login();
        }
        this.loginView.setElement("#cloudmesh-app").render();
    }

    app() {
        if(!this.appView){
            this.appView = new App();
        }
        this.appView.setElement("#cloudmesh-app").render();
        document.getElementById("title").innerHTML = "Dashboard";
    }

    vms() {
        if(!this.vmView){
            this.vmView = new VMs();
        }
        dispatcher.trigger('removeChildViews');
        this.vmView.setElement(".drawer-main-content-body").render();
        document.getElementById("title").innerHTML = "VM List";
    }

    images() {
        if(!this.imageView){
            this.imageView = new Images();
        }
        dispatcher.trigger('removeChildViews');
        this.imageView.setElement(".drawer-main-content-body").render();
        document.getElementById("title").innerHTML = "Image List";
    }
}
