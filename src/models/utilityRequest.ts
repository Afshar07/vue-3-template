export interface utilityRequest {
  utilityId?: number | null;
  userId: number | null;
  shopId: number | null;
  createDate: Date | null;
  type: number | null;
  status?: number | null;
  description?: null | string;
  isDeleted?: boolean | null;
}
