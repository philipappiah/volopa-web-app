import { Document, Schema, model } from 'mongoose';

export interface Currency extends Document {
    name:String;
    longName:String;
    rate:Number;
    popularity:Number;
   
    

}



const currencySchema = new Schema<Currency>({

    name: {
        type: String,
        unique:true,
        required: [true, 'Please provide a currency name!']
      },
    longName:{
      type: String,
      unique:true,
      
    },
    rate: {
      type: Number,
      required:[true, 'Please provide a rate relative to the USD'],
      validate: {
        validator: function(val:Number) {
          
          return val > 0;
        },
        message: 'Rate must be greater than 0'
        
      }
      },
    popularity: {
      type: Number,
      default:5,
      validate: {
        validator: function(val:Number) {
          
          return val > 0 && val <= 10;
        },
        message: 'Popluarity must be between 1 - 10',
        
      }
      },
   
    
      
 
},{ timestamps: true })




currencySchema.virtual('id').get(function(){
  return this._id.toHexString();
});



currencySchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   
    delete ret._id 
   }
});





export const CurrencyModel = model<Currency>("Currency", currencySchema);