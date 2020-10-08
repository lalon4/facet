import {
  CLUSTER_NAME,
  API_VIP,
  INGRESS_VIP,
  openCluster,
  waitForHostTablePopulation,
  waitForHostsSubnet,
  waitForPendingInputState,
  setClusterSubnetCidr,
  setHostsRole,
  saveClusterDetails,
  waitForHostsToBeKnown,
  checkValidationMessage,
} from './shared';

// Start condition: Theese tests assume that:
// 1. new cluster created,
// 2. ISO already generated
// 3. Nodes are booted with generated ISO
// End: In the end of this test, all hosts will be Known, and cluster is not ready to install,
//      due to missing DNS name.

describe('Enter cluster details', () => {
  it('open the cluster details', () => {
    openCluster(CLUSTER_NAME);
  });

  it('wait for the hosts table to be populated', () => {
    waitForHostTablePopulation(cy);
  });

  it("set host's role", () => {
    setHostsRole();
  });

  it('wait for the subnets options to be populated', () => {
    waitForHostsSubnet(cy);
  });

  it('wait for all hosts to reach pending input state', () => {
    waitForPendingInputState(cy);
  });

  it('select the first subnet CIDR', () => {
    setClusterSubnetCidr(cy);
  });

  it('set API VIP', () => {
    cy.get('#form-input-apiVip-field').clear();
    cy.get('#form-input-apiVip-field').type(API_VIP);
  });

  it('set ingress VIP', () => {
    cy.get('#form-input-ingressVip-field').clear();
    cy.get('#form-input-ingressVip-field').type(INGRESS_VIP);
  });

  it('save cluster details', () => {
    saveClusterDetails(cy);
  });

  it('set masters and worker role', () => {
    setHostsRole();
  });

  it('check that all hosts are known', () => {
    waitForHostsToBeKnown();
  });

  it('check alert message due to missing DNS', () => {
    checkValidationMessage(cy, 'Base DNS Domain is undefined');
  });
});
