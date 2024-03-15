export interface NotificationDTO {
  id: number;
  name: string;
  shop: string;
  username: string;
  price: number;
  date: Date;
  isTrigered: boolean;
}
