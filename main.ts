
//% weight=70 icon="\uf075" color=#FF0000 block="TMP117"
namespace Grove_TMP117 {
    //    let p1 = DigitalPin.P0;
    //    let p2 = DigitalPin.P16;
    let N : number;
 

    export class TMP117 {
        TMP117WReg(addr: number) {
            let buf: Buffer = pins.createBuffer(1);
            buf[0] = 0x00;
            pins.i2cWriteBuffer(addr, buf, false);
        }
        TMP117WReg2(addr: number) {
            let buf: Buffer = pins.createBuffer(2);
            buf[0] = 0x00;
            buf[1] = 0x06;
            pins.i2cWriteBuffer(addr, buf, false);
        }
        TMP117WReg3(addr: number) {
            let buf: Buffer = pins.createBuffer(3);
            buf[0] = 0x01;
            buf[1] = 0x0c;
            buf[1] = 0x00;

            pins.i2cWriteBuffer(addr, buf, false);
        }
        TMP117RReg(addr: number): Buffer{
            let buf: Buffer = pins.createBuffer(2);
            buf = pins.i2cReadBuffer(addr, 2, false);

            return buf;
        }

    }
    //% blockId=inittmp117 block="TMP117初期化"
    export function InitTmp117(): void {
        let tmp = new TMP117;
        tmp.TMP117WReg2(73);
    }
    //% blockId=readtmp117 block="TMP117読み込み"
    
    export function ReadTmp117(): number{
        let buf: Buffer = pins.createBuffer(2);
        let tmp = new TMP117;
        let temp2 : number;
        while (N < 36) {
            tmp.TMP117WReg3(73);
            basic.pause(20);
            tmp.TMP117WReg2(73);
            buf = tmp.TMP117RReg(73);
            temp2 = (buf[0] * 256 + buf[1]) * 0.0078125;
            if (temp2 > 255.99){
                temp2 = temp2 - 512;
            }
            N ++;

        }
        return temp2;

    }
}