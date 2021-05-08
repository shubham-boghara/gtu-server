import {Schema,model, Model} from "mongoose";

import {fileUrl} from "./types";

const fileUrlSchema:Schema= new Schema({
    name: {
        type: String,
    },
    link: {
        type: String
    },

});

const fileUrl:Model<fileUrl> = model<fileUrl>("fileUrls",fileUrlSchema);

export default fileUrl;
