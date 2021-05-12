import {Schema,model, Model} from "mongoose";

import {comment} from "./types";

const commentSchema:Schema= new Schema({
    name: {
        type: String,
        default:" ",
    },
    text: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },

});

const comment:Model<comment> = model<comment>("comments",commentSchema);

export default comment;
