import { ILike, In } from 'typeorm';

export const mutateQuery = (query: any) => {
  const page = query?.page || 1;
  const limit = query?.limit || 10;
  const sortBy = query?.sortBy || 'createdAt';
  const sortOrder = query?.sortOrder || 'ASC';
  const skip = (page - 1) * limit;
  delete query['page'];
  delete query['limit'];
  delete query['sortBy'];
  delete query['sortOrder'];

  if (query?.name) {
    const val = query.name;
    query.name = ILike(`%${val}%`);
  }

  if (query?.ids?.length > 0) {
    query.id = In(query.ids);
    delete query.ids;
  }
  return { limit, skip, sortBy, sortOrder, conditions: query };
};
