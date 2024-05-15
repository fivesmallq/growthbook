import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Member, OrganizationInterface } from "@back-end/types/organization";
import { UserInterface } from "@back-end/types/user";
import { useAuth } from "@/services/auth";
import { useUser } from "@/services/UserContext";
import useApi from "@/hooks/useApi";
import ConfirmModal from "@/components/ConfirmModal";

interface SuperAdminConfirmation {
  userId: string;
  action: "grant" | "revoke";
}
export default function MembersTable({
  members,
  orgId,
}: {
  members: Member[];
  orgId: string;
}) {
  const { apiCall } = useAuth();
  const { userId } = useUser();
  const [confirm, setConfirm] = useState<SuperAdminConfirmation | null>(null);

  const { data, error: usersError, mutate } = useApi<{
    users: UserInterface[];
  }>(`/admin/organization/${orgId}/users`);
  const users = data?.users || [];

  const membersById = members.reduce((acc, m) => {
    if (!acc[m.id]) acc[m.id] = m;
    return acc;
  }, {} as Record<string, Member>);
  const isMemberOf = userId ? Object.keys(membersById).includes(userId) : false;
  const setSuperAdminAccess = async (confirmation: SuperAdminConfirmation) => {
    try {
      await apiCall<{
        organizations: OrganizationInterface[];
        total: number;
      }>(`/admin/user/${confirmation.userId}`, {
        method: "POST",
        body: JSON.stringify({
          superAdmin: confirmation.action === "grant",
        }),
      });
      mutate();
    } catch (e) {
      console.error("Error setting super admin access", e);
    }
  };
  return (
    <>
      <table className="my-4 w-100">
        <thead>
          <tr>
            <th>User/Member ID</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Project Roles</th>
            <th>superAdmin</th>
          </tr>
        </thead>
        <tbody>
          {usersError ? (
            <div>
              There was an error fetching users for this row:{" "}
              {usersError.message}
            </div>
          ) : (
            users.map((u, i) => (
              <tr key={i}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.verified ? <FaCheck /> : <FaTimes />}</td>
                <td>
                  {membersById[u.id].projectRoles?.map((r, i) => (
                    <ul key={i}>
                      <li>Project: {r.project} </li>
                      <li>Role: {r.role}</li>
                      <li>Environments: {r.environments.join(", ")}</li>
                      <li>Teams: {r.teams?.join(", ")}</li>
                    </ul>
                  ))}
                </td>
                <td>
                  <span>{u.superAdmin ? <FaCheck /> : <FaTimes />}</span>
                  {isMemberOf && u.id !== userId ? (
                    <span className="ml-2" style={{ fontSize: "0.8rem" }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setConfirm({
                            userId: u.id,
                            action: u.superAdmin ? "revoke" : "grant",
                          });
                        }}
                      >
                        {u.superAdmin ? "Revoke" : "Grant"}
                      </a>
                    </span>
                  ) : null}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ConfirmModal
        title={`${
          confirm?.action === "revoke" ? "Revoke" : "Grant"
        } Super Admin Access`}
        yesText="Yes, I'm sure"
        noText="Nevermind"
        modalState={isMemberOf && !!confirm}
        setModalState={() => setConfirm(null)}
        onConfirm={() => {
          if (!confirm) return;
          setSuperAdminAccess(confirm);
          setConfirm(null);
        }}
      >
        {confirm?.action === "grant" ? (
          <>
            <p className="text-left">
              Be careful. Elevating a user to super admin access means they will
              have unrestricted access to ALL of your GrowthBook organizations
              and all nested data.
            </p>
            <p>Please confirm you that want to do this.</p>
          </>
        ) : (
          <>
            <p className="text-left">
              Are you sure you want to revoke this user&apos;s super admin
              rights?
            </p>
          </>
        )}
      </ConfirmModal>
    </>
  );
}
