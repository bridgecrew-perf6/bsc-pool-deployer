import { log, BigInt, Bytes } from '@graphprotocol/graph-ts'

import { DeployPoolCall, DeployNewNftPool, PoolDeployer } from "../generated/PoolDeployer/PoolDeployer"
import { PoolDeployerEntity, NftPoolEntity } from "../generated/schema"

// export function handleDeployPool(call: DeployPoolCall): void {
//   let id = call.transaction.hash.toHex();
//   let poolDeployer = PoolDeployerEntity.load(id);

//   log.info('handleDeployPool call.transaction.hash id {}', [id.toString()]);

//   log.info('handleDeployPool call.inputs.operator id {}', [call.inputs.operator.toHex().toString()]);

//   if (!poolDeployer) {
//     poolDeployer = PoolDeployerEntity.load(call.inputs.operator.toHex());
//   }

//   if (!poolDeployer) {
//     poolDeployer = new PoolDeployerEntity(call.inputs.operator.toHex());
//   }

//   poolDeployer.save();
// }

export function handleDeployNewNftPool(event: DeployNewNftPool): void {
  let contract = PoolDeployer.bind(event.address)

  let id = event.transaction.hash.toHex();
  let poolDeployer = PoolDeployerEntity.load(id);

  if (!poolDeployer) {
    poolDeployer = new PoolDeployerEntity(id);
  }

  poolDeployer.poolCount = contract.poolCount();

  const count = contract.poolCount().toU32();

  (poolDeployer.allPools as Array<Bytes>).push(contract.allPools(BigInt.fromI32(count)));

  poolDeployer.save();
}
