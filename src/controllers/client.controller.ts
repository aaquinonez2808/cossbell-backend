import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { CreateClientDto } from "../dto/client/Create-client.dto";
import { UpdateClientDto } from "../dto/client/Update-client.dto";
import { ResponseHandler } from "../config/Response";
import { CustomError } from "../config/errors/custom.error";
import { PaginationDto } from "../dto/shared/pagination.dto";

export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  createClient = (req: Request, res: Response) => {
    const [error, createClientDto] = CreateClientDto.create(req.body);
    if (error) return ResponseHandler.sendErrorResponse(res, error);
    this.clientService
      .createClient(createClientDto!)
      .then((client) => {
        ResponseHandler.sendCreatedResponse(
          res,
          client,
          "Client successfully created"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  getClients = (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+limit, +page);
    if (error) return res.status(400).json({ error: error });
    console.log(paginationDto!);
    this.clientService
      .getClients(paginationDto!)
      .then((clients) => {
        ResponseHandler.sendSuccessResponse(
          res,
          clients,
          "Clients retrieved successfully"
        );
      })
      .catch((error) => {
        console.log(error);
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  getClient = (req: Request, res: Response) => {
    const clientId = parseInt(req.params.id);
    if (!clientId || isNaN(Number(clientId)))
      ResponseHandler.sendErrorResponse(
        res,
        CustomError.badRequest("ID IS INVALID")
      );
    this.clientService
      .getClient(clientId)
      .then((client) => {
        ResponseHandler.sendSuccessResponse(
          res,
          client,
          "Client retrieved successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  updateClient = (req: Request, res: Response) => {
    const clientId = parseInt(req.params.id);
    const [error, updateClientDto] = UpdateClientDto.create({
      id_cliente: clientId,
      ...req.body,
    });
    if (error) return ResponseHandler.sendErrorResponse(res, error);
    this.clientService
      .updateClient(updateClientDto!)
      .then((updatedClient) => {
        ResponseHandler.sendSuccessResponse(
          res,
          updatedClient,
          "Client updated successfully"
        );
      })
      .catch((error) => {
        console.log(error);
        ResponseHandler.sendErrorResponse(res, error);
      });
  };

  deleteClient = (req: Request, res: Response) => {
    const clientId = parseInt(req.params.id);
    if (!clientId || isNaN(clientId))
      return ResponseHandler.sendErrorResponse(
        res,
        CustomError.badRequest("Invalid ID")
      );

    this.clientService
      .deleteClient(clientId)
      .then((deletedClient) => {
        ResponseHandler.sendSuccessResponse(
          res,
          deletedClient,
          "Client deleted successfully"
        );
      })
      .catch((error) => {
        ResponseHandler.sendErrorResponse(res, error);
      });
  };
}
