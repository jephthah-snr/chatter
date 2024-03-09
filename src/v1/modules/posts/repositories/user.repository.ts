import { DeviceModel } from "@database/models/userDevices.models";
import { deviceType } from "@shared/types/device/device.types";
import { Transaction } from "objection";

export class DeviceRepository{
    
    public async findByDeviceid(deviceId: string, trx?: Transaction) {
        return await DeviceModel.query(trx).where({deviceId}).withGraphFetched({'user': true}).first();
    };

    public async updateDevice(deviceId: string, payload: Partial<DeviceModel>, trx?: Transaction){
        await DeviceModel.query(trx).where({deviceId}).update(payload);
    };

    public async createUserDevice(payload: deviceType, trx?: Transaction){
        return await DeviceModel.query(trx).insert(payload)
    }

    public async deleteDevice(id: string, trx:Transaction){
        return await DeviceModel.query(trx).deleteById(id)
    }
}