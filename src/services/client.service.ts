import { CustomError } from "../config/errors/custom.error";
import { Cliente } from "../db/models/Client";
import { CreateClientDto } from "../dto/client/Create-client.dto";
import { UpdateClientDto } from "../dto/client/Update-client.dto";
import { PaginationDto } from "../dto/shared/pagination.dto";
import { PaginationEntity } from "../entities/paginationEntity";

export class ClientService {
  public async createClient(createClientDto: CreateClientDto) {
    const clienteExit = await Cliente.findOne({
      where: { cedula: createClientDto.cedula_cliente },
    });

    if (clienteExit) throw CustomError.badRequest("Customer already exist");

    try {
      const customerNew = {
        nombre: createClientDto.nombre_cliente,
        apellido: createClientDto.apellido_cliente,
        cedula: createClientDto.cedula_cliente,
        edad: createClientDto.edad_cliente,
        fechaNacimiento: createClientDto.fecha_nacimiento_cliente,
        celular: createClientDto.celular_cliente,
        direccion: createClientDto.direccion_cliente,
      };
      const customer = Cliente.create({ ...customerNew });
      await customer.save();
      return customer;
    } catch (error) {
      throw CustomError.internal(` ${error}`);
    }
  }

  public async getClients(
    paginationDto: PaginationDto
  ): Promise<PaginationEntity<Cliente>> {
    const [clientes, cliestesTotales] = await Promise.all([
      Cliente.find({
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      }),
      Cliente.count(),
    ]);

    const data = PaginationEntity.fromPaginationDto({
      datosTotal: cliestesTotales,
      paginationDto,
      datos: clientes,
      nombreData: "clientes",
    });

    return data;
  }

  public async getClient(id: number): Promise<Cliente> {
    const cliente = await Cliente.findOne({ where: { id } });
    if (!cliente) throw CustomError.notFound("Customer not found");
    return cliente;
  }

  public async deleteClient(id: number): Promise<Cliente> {
    const cliente = await Cliente.findOne({ where: { id } });
    if (!cliente) throw CustomError.notFound("Customer not found");

    await cliente.remove();
    return cliente;
  }

  public async updateClient(
    updateClientDto: UpdateClientDto
  ): Promise<Cliente> {
    const cliente = await Cliente.findOne({
      where: { id: updateClientDto.id_cliente },
    });

    if (!cliente) throw CustomError.notFound("Customer not found");
    try {
      const updatedCustomer = Cliente.merge(cliente, {
        ...updateClientDto.values,
      });
      await updatedCustomer.save();
      return updatedCustomer;
    } catch (error) {
      console.log(error);
      throw CustomError.internal(` ${error}`);
    }
  }
}
