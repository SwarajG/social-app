class RedisClient {
  connect(redisClient) {
    this.redis = redisClient;
  }

  getValue(key) {
    return this.redis.get(key);
  }

  setValue(key, value) {
    return this.redis.set(key, value);
  }
}

module.exports = RedisClient;