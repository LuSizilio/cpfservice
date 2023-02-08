import { EXISTS_CPF_EXCEPTION, INVALID_CPF_EXCEPTION, NOTFOUND_CPF_EXCEPTION } from '../utils/constants/errors';
import { AddCpfInputDTO } from '../utils/dto/cpfvalidator.dto';
import { CpfValidatorController } from './cpfvalidator.controller';
import { CpfValidatorService } from './cpfvalidator.service';

describe('cpfValidatorController', () => {
  let cpfValidatorController: CpfValidatorController;
  let cpfValidatorService: CpfValidatorService;
  const usersEntity = {
    user: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    users: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    cpfValidatorService = new CpfValidatorService(usersEntity as any);
    cpfValidatorController = new CpfValidatorController(cpfValidatorService);
  });

  describe('Testando addCpf', () => {
    it('Deve retornar erro de que CPF é inválido', async () => {
      const input: AddCpfInputDTO = {
        cpf: '01713732431',
      };

      try {
        await cpfValidatorController.addCpf(input);
      } catch (err) {
        const { status, ...errorData } = INVALID_CPF_EXCEPTION;
        expect(err.response).not.toEqual(INVALID_CPF_EXCEPTION);
        expect(err.response).toEqual(errorData);
      }
    });

    it('Deve adicionar CPF normalmente', async () => {
      const input: AddCpfInputDTO = {
        cpf: '01713732432',
      };

      usersEntity.user.mockImplementation(() => {
        throw {
          code: 'P2025',
        };
      });

      usersEntity.createUser.mockResolvedValue(input);

      await cpfValidatorController.addCpf(input);
    });

    it('Deve retornar erro de que CPF já está cadastrado', async () => {
      const input: AddCpfInputDTO = {
        cpf: '01713732432',
      };

      usersEntity.user.mockResolvedValue(input);

      try {
        await cpfValidatorController.addCpf(input);
      } catch (err) {
        const { status, ...errorData } = EXISTS_CPF_EXCEPTION;
        expect(err.response).not.toEqual(EXISTS_CPF_EXCEPTION);
        expect(err.response).toEqual(errorData);
      }
    });
  });

  describe('Testando checkCpf', () => {
    it('Deve retornar erro de que CPF é inválido', async () => {
      const input = '01713732431';

      try {
        await cpfValidatorController.checkCpf(input);
      } catch (err) {
        const { status, ...errorData } = INVALID_CPF_EXCEPTION;
        expect(err.response).not.toEqual(INVALID_CPF_EXCEPTION);
        expect(err.response).toEqual(errorData);
      }
    });

    it('Deve retornar erro de que CPF não está cadastrado', async () => {
      const input = '01713732432';

      usersEntity.user.mockImplementation(() => {
        throw {
          code: 'P2025',
        };
      });

      try {
        await cpfValidatorController.checkCpf(input);
      } catch (err) {
        const { status, ...errorData } = NOTFOUND_CPF_EXCEPTION;
        expect(err.response).not.toEqual(NOTFOUND_CPF_EXCEPTION);
        expect(err.response).toEqual(errorData);
      }
    });

    it('Deve retornar CPF verificado', async () => {
      const input = '01713732432';
      const mockResolvedValue = { cpf: '01713732432', createdAt: '2023-02-05T04:54:20.204Z' };

      usersEntity.user.mockResolvedValue(mockResolvedValue);

      expect(await cpfValidatorController.checkCpf(input)).toEqual(mockResolvedValue);
    });
  });

  describe('Testando removeCpf', () => {
    it('Deve retornar erro de que CPF é inválido', async () => {
      const input = '01713732431';

      try {
        await cpfValidatorController.removeCpf(input);
      } catch (err) {
        const { status, ...errorData } = INVALID_CPF_EXCEPTION;
        expect(err.response).not.toEqual(INVALID_CPF_EXCEPTION);
        expect(err.response).toEqual(errorData);
      }
    });

    it('Deve retornar erro de que CPF não está cadastrado', async () => {
      const input = '01713732432';

      usersEntity.user.mockImplementation(() => {
        throw {
          code: 'P2025',
        };
      });

      try {
        await cpfValidatorController.removeCpf(input);
      } catch (err) {
        const { status, ...errorData } = NOTFOUND_CPF_EXCEPTION;
        expect(err.response).not.toEqual(NOTFOUND_CPF_EXCEPTION);
        expect(err.response).toEqual(errorData);
      }
    });

    it('Deve deletar o CPF especificado', async () => {
      const input = '01713732432';
      const mockResolvedValue = { cpf: '01713732432', createdAt: '2023-02-05T04:54:20.204Z' };

      usersEntity.user.mockResolvedValue(mockResolvedValue);

      usersEntity.deleteUser.mockResolvedValue(true);

      await cpfValidatorController.removeCpf(input);
    });
  });

  describe('Testando findAllCpfs', () => {
    it('Deve retornar lista com cpfs', async () => {
      const mockResolvedValue = [{ cpf: '01713732432', createdAt: '2023-02-05T04:54:20.204Z' }];

      usersEntity.users.mockResolvedValue(mockResolvedValue);

      expect(await cpfValidatorController.findAllCpfs()).toEqual(mockResolvedValue);
    });

    it('Deve retornar lista vazia', async () => {
      const mockResolvedValue = [];

      usersEntity.users.mockResolvedValue(mockResolvedValue);

      expect(await cpfValidatorController.findAllCpfs()).toEqual(mockResolvedValue);
    });
  });
});
