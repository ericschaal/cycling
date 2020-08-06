export default class RemoteRepository<K, V> {
  async findOne(id: K): Promise<V | null> {
    return null;
  }
}
