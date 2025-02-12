import React from "react";

const ProtocolTable = () => {
  const protocols = [
    {
      protocolId: "AHD12345",
      raLead: "parul.goyal",
      clinicalLabellingManager: "rachana.dubey",
      ctaSM: "jaylani.kabeef",
      ctaAssociate: "jaylani.kabeef",
      studyLead: "jaylani.kabeef",
    },
    {
      protocolId: "JKL12345",
      raLead: "parul.goyal",
      clinicalLabellingManager: "rachana.dubey",
      ctaSM: "jaylani.kabeef",
      ctaAssociate: "jaylani.kabeef",
      studyLead: "jaylani.kabeef",
    },
    {
      protocolId: "IOP09876",
      raLead: "parul.goyal",
      clinicalLabellingManager: "rachana.dubey",
      ctaSM: "jaylani.kabeef",
      ctaAssociate: "jaylani.kabeef",
      studyLead: "jaylani.kabeef",
    }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          + ADD PROTOCOL USERS
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-2 border">Protocol ID</th>
              <th className="px-4 py-2 border">RA Lead</th>
              <th className="px-4 py-2 border">Clinical Labelling Manager</th>
              <th className="px-4 py-2 border">CTA SM</th>
              <th className="px-4 py-2 border">CTA Associate</th>
              <th className="px-4 py-2 border">Study Lead</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((protocol, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 border cursor-pointer">
                  <span className="text-blue-800">{protocol.protocolId}</span>
                </td>
                <td className="px-4 py-2 border">{protocol.raLead}</td>
                <td className="px-4 py-2 border">
                  {protocol.clinicalLabellingManager}
                </td>
                <td className="px-4 py-2 border">{protocol.ctaSM}</td>
                <td className="px-4 py-2 border">{protocol.ctaAssociate}</td>
                <td className="px-4 py-2 border">{protocol.studyLead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProtocolTable;
