import Backbone from "backbone";
import $ from "jquery";
import dispatcher from "../util/dispatcher";
import Tabs from "../dumb-views/tabs";
import template from "../templates/images.hbs";
import Api from "../util/api";

export default class Images extends Backbone.View {
    constructor() {
        super();
        this.tabsView = new Tabs({
            triggerName: "imageTabSelected",
            showSortOptions: false,
            tabs: ["AWS", "Azure"]
        });
        this.edges = {aws:[],azure:[]};
        dispatcher.on("imageTabSelected", this.tabSelected, this);
        dispatcher.on("removeChildViews", this.removeChildren, this);
    }

    static imageQuery(imageType) {
        switch (imageType) {
            case "aws":
                return {
                    query: "allAwsImages",
                    title: "AWS"
                };
            case "azure":
                return {
                    clause: "allAzureImages",
                    title: "Azure"
                };
            default:
                return {
                    clause: "allAwsImages",
                    title: "AWS"
                };
        }
    }

    render() {
        this.$el.html(template());
        this.tabsView.setElement("#imageTabs").render();
        this.tabSelected("aws");
    }

    tabSelected(name) {
        if (this.edges[name] && this.edges[name].length > 0) {
            dispatcher.trigger("showCards", this.edges[name], "image");
            return;
        }
        let queryName = Images.imageQuery(name).query;
        this.selectedTab = name;
        let vmQuery = "{ " + queryName + " { edges { node { name, location, publisher} } } }";
        Api.post(vmQuery).then((res) => {
            this.edges[this.selectedTab] = res.data[queryName].edges;
            dispatcher.trigger("showCards", this.edges[this.selectedTab], "image");
        });
    }

    removeChildren() {
        this.tabsView.remove();
    }
}