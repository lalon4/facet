import {
  CLUSTER_NAME,
  DNS_DOMAIN_NAME,
  API_VIP,
  INGRESS_VIP,
  openCluster,
  disableDhcpVip,
  waitForHostTablePopulation,
  waitForHostsSubnet,
  waitForPendingInputState,
  setClusterDnsDomain,
  setClusterSubnetCidr,
  setHostsRole,
  saveClusterDetails,
  waitForHostsToBeKnown,
} from './shared';

describe('Enter cluster details', () => {
  it('can open the cluster details', () => {
    openCluster(CLUSTER_NAME);
  });

  it('wait for the hosts table to be populated', () => {
    waitForHostTablePopulation(cy);
  });

  it('wait for the subnets options to be populated', () => {
    waitForHostsSubnet(cy);
  });

  it('wait for all hosts to reach pending input state', () => {
    waitForPendingInputState(cy);
  });

  it('can set the base domain name', () => {
    setClusterDnsDomain(DNS_DOMAIN_NAME);
  });

  it('can select the first subnet CIDR', () => {
    setClusterSubnetCidr(cy);
  });

  it('can set API VIP and ingress VIP', () => {
    disableDhcpVip(cy, API_VIP, INGRESS_VIP);
  });

  it('can save cluster details', () => {
    saveClusterDetails(cy);
  });
});

describe('Set roles', () => {
  it('set the masters and worker roles', () => {
    setHostsRole();
  });

  it('wait for all hosts to be known', () => {
    waitForHostsToBeKnown(cy);
  });
});
