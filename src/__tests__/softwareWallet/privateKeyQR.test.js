import qrcode from 'qrcode';

import software from '../../software';
import * as utils from '../../utils';

jest.mock('qrcode');
jest.mock('../../utils');

describe('`software` wallet module', () => {
  afterEach(() => {
    qrcode.toDataURL.mockClear();
  });
  describe('`SoftwareWallet` Private Key QR', () => {
    test('Add the `privateKeyQR` prop to the wallet instance', () => {
      const testWallet = software.SoftwareWallet.create({});
      testWallet.privateKey = '0x321';
      const privateKeyQRGetterSpy = jest.spyOn(
        software.SoftwareWallet.prototype,
        'privateKeyQR',
        'get',
      );
      expect(testWallet).toHaveProperty('privateKeyQR');
      expect(testWallet.privateKeyQR).resolves.toEqual('base64');
      expect(privateKeyQRGetterSpy).toHaveBeenCalled();
      expect(qrcode.toDataURL).toHaveBeenCalled();
      privateKeyQRGetterSpy.mockReset();
      privateKeyQRGetterSpy.mockRestore();
    });
    test("Can't get the QR code if no private key is available", () => {
      const testWallet = software.SoftwareWallet.create({});
      const privateKeyQRGetterSpy = jest.spyOn(
        software.SoftwareWallet.prototype,
        'privateKeyQR',
        'get',
      );
      expect(testWallet).toHaveProperty('privateKeyQR');
      expect(testWallet.privateKeyQR).resolves.toEqual(undefined);
      expect(privateKeyQRGetterSpy).toHaveBeenCalled();
      expect(utils.error).toHaveBeenCalled();
      expect(qrcode.toDataURL).not.toHaveBeenCalled();
      privateKeyQRGetterSpy.mockReset();
      privateKeyQRGetterSpy.mockRestore();
    });
  });
});
