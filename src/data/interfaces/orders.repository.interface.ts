import { Order } from "src/orders/entities/order.entity"
import { CreateOrderDto } from "src/orders/dto/create-order.dto"
import { UpdateOrderDto } from "src/orders/dto/update-order.dto"

export interface OrdersRepositoryInterface {
     create(payload: CreateOrderDto): Promise<Order>
     findAll(): Promise<Order[]>
     findById(id: string): Promise<Order>
     update(id: string, payload: UpdateOrderDto): Promise<void>
     delete(id: string): Promise<void>
}