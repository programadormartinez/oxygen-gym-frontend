import { create } from 'zustand';
import { Member } from '../types/member';
import { addMonths } from 'date-fns';

interface MemberStore {
  members: Member[];
  addMember: (member: Omit<Member, 'id'>) => Member;
  updateMember: (member: Member) => void;
  checkIn: (documentId: string) => Member | undefined;
  searchMembers: (query: string) => Member[];
  getMemberByDocument: (documentId: string) => Member | undefined;
  updateMembershipPayment: (id: string, months: number) => void;
  deactivateMember: (id: string) => void;
}

const initialMembers: Member[] = [
  {
    id: '1',
    documentId: '12345678',
    name: 'John Doe',
    membershipEnd: new Date('2024-12-03'),
    status: 'active',
    lastPayment: new Date('2024-03-03'),
  },
  {
    id: '2',
    documentId: '39081181',
    name: 'Jane Smith',
    membershipEnd: new Date('2024-12-15'),
    status: 'active',
    lastPayment: new Date('2024-12-16'),
  },
];

export const useMemberStore = create<MemberStore>((set, get) => ({
  members: initialMembers,
  
  addMember: (memberData) => {
    const newMember: Member = {
      ...memberData,
      id: crypto.randomUUID(),
    };
    
    set((state) => ({
      members: [...state.members, newMember],
    }));
    
    return newMember;
  },
  
  updateMember: (updatedMember) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      ),
    }));
  },
  
  checkIn: (documentId) => {
    const member = get().members.find((m) => m.documentId === documentId);
    if (member) {
      const updatedMember = {
        ...member,
        lastCheckIn: new Date(),
      };
      get().updateMember(updatedMember);
      return updatedMember;
    }
    return undefined;
  },
  
  getMemberByDocument: (documentId) => {
    return get().members.find((m) => m.documentId === documentId);
  },
  
  searchMembers: (query) => {
    const members = get().members;
    if (!query) return members;
    
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.documentId.includes(query)
    );
  },

  updateMembershipPayment: (id: string, months: number) => {
    set((state) => ({
      members: state.members.map((member) => {
        if (member.id === id) {
          const currentEnd = member.membershipEnd > new Date() ? member.membershipEnd : new Date();
          return {
            ...member,
            status: 'active',
            lastPayment: new Date(),
            membershipEnd: addMonths(currentEnd, months),
          };
        }
        return member;
      }),
    }));
  },

  deactivateMember: (id: string) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === id ? { ...member, status: 'inactive' } : member
      ),
    }));
  },
}));