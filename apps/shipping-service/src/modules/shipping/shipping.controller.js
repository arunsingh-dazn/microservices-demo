import { ApiResponse, HTTP_STATUS } from "@microservices-demo/shared";

export function createShippingController(service) {
  return {
    getShipments: async (req, res, next) => {
      try {
        const shipments = await service.getShipments();

        return res.status(HTTP_STATUS.OK).json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: "Shipments fetched successfully.",
            data: shipments,
          }),
        );
      } catch (error) {
        next(error);
      }
    },

    getShipmentById: async (req, res, next) => {
      try {
        const shipment = await service.getShipmentById(req.params.id);

        return res.status(HTTP_STATUS.OK).json(
          new ApiResponse({
            statusCode: HTTP_STATUS.OK,
            message: "Shipment fetched successfully.",
            data: shipment,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  };
}
